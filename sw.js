// sw.js — Service Worker do app iNow X50.
// Estratégia: network-first (tenta buscar na rede e atualiza o cache; se não
// houver rede, cai para o que já está guardado). Assim o app atualiza sozinho
// quando há internet e continua abrindo mesmo sem sinal nenhum.

const CACHE_NAME = 'inow-x50-v1';

const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(
        nomes.filter((nome) => nome !== CACHE_NAME).map((nome) => caches.delete(nome))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Só cuida de GET dentro da própria origem — o resto (ex: nada de BLE aqui) passa direto.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const resposta = await fetch(req);
      // Só guarda no cache respostas válidas (evita cachear erros ou respostas opacas).
      if (resposta && resposta.ok && resposta.type === 'basic') {
        const copia = resposta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copia));
      }
      return resposta;
    } catch (e) {
      // Sem rede: tenta o cache exato primeiro.
      const cached = await caches.match(req);
      if (cached) return cached;
      // Se for navegação de página (o usuário abrindo o app) e não achou nada,
      // devolve o index.html do cache para o app continuar abrindo offline.
      if (req.mode === 'navigation') {
        const pagina = await caches.match('./index.html');
        if (pagina) return pagina;
      }
      // Última opção: nunca devolver "undefined" (isso derruba a página com erro).
      return new Response('Sem conexão e sem cache.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  })());
});
