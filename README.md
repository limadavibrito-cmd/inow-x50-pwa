# iNow X50 — App de controle pelo Bluetooth

Este é um app simples (PWA) que fala diretamente com a bicicleta elétrica iNow X50
pelo Bluetooth, sem precisar de servidor nem de internet depois de instalado. Pelo
app dá para travar/destravar a bike, ligar o farol, trocar de modo, ligar o cruise
e ver a marcha.

---

## 1. Publicar no GitHub Pages (passo a passo)

Isso coloca o app numa página https na internet — é preciso porque o Bluetooth do
celular só funciona em páginas https (ou localhost).

1. Crie uma conta gratuita em https://github.com (se ainda não tiver uma).
2. Clique no botão verde **"New"** (ou **"+"** no canto superior direito > **"New repository"**)
   para criar um repositório novo.
   - Dê um nome, por exemplo `inow-x50-pwa`.
   - Deixe como **Public**.
   - Não marque nenhuma opção de criar README/gitignore — deixe vazio.
   - Clique em **"Create repository"**.
3. Na página do repositório recém-criado, clique no link **"uploading an existing file"**
   (ou vá em **Add file > Upload files**).
4. Arraste para dentro os **6 arquivos** que estão nesta pasta, direto na raiz do
   repositório (não crie nenhuma subpasta):
   - `index.html`
   - `sw.js`
   - `manifest.webmanifest`
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`
5. Role para baixo e clique em **"Commit changes"** (pode manter a mensagem padrão).
6. Vá na aba **Settings** do repositório (topo da página).
7. No menu da esquerda, clique em **Pages**.
8. Em **"Build and deployment" > "Source"**, escolha **"Deploy from a branch"**.
9. Em **"Branch"**, escolha `main` e a pasta **`/ (root)`**. Clique em **Save**.
10. Espere alguns minutos (o GitHub mostra uma mensagem de "building"). Depois disso,
    recarregue a página de Settings > Pages e vai aparecer uma URL parecida com:
    `https://seu-usuario.github.io/inow-x50-pwa/`
11. Essa é a URL https que você vai usar no celular. Guarde ela.

---

## 2. Abrir no iPhone

O Safari do iPhone **não tem** suporte a Web Bluetooth, então é preciso usar outro
navegador que tenha:

1. Abra a **App Store** e instale o app **Bluefy** (navegador com suporte a Bluetooth).
2. Abra o Bluefy e digite a URL https do passo anterior (a do GitHub Pages), por
   exemplo `https://limadavibrito-cmd.github.io/inow-x50-pwa/`.
3. **Não** tente usar "Adicionar à Tela de Início" — esse recurso é exclusivo do
   Safari, e o ícone criado por ele abriria no Safari, que não tem Web Bluetooth
   (o app apareceria mas não conseguiria conectar na bike).
4. O Bluefy também **não tem** configuração de página inicial (conferido na versão
   3.9.3). Então, para ter acesso rápido, o que funciona é:
   - **Favoritar**: toque na estrela ☆ ao lado da barra de endereço.
   - **Não fechar a aba**: o Bluefy reabre na última página aberta. Deixando o app
     na aba, basta tocar no ícone do Bluefy no iPhone que ele já cai direto no app.
   - **Não mexa** na opção "Ativar anúncios publicitários BLE" das configurações do
     Bluefy: este app não usa esse recurso, e o próprio Bluefy avisa que ele pode
     causar comportamento inesperado. Deixe desligada.
5. Observação honesta: no Bluefy o cache offline **não funciona** (esse navegador
   não tem suporte a service worker). O app funciona normalmente mesmo assim, mas
   para não depender de internet na garagem, é melhor deixar o Bluefy aberto em
   segundo plano em vez de fechá-lo à força.

---

## 3. Primeiro uso

1. Abra o app no Bluefy (pela aba já aberta ou pelo favorito).
2. Toque na **engrenagem** (⚙️) no canto superior direito.
3. Digite a **senha de pareamento de 6 dígitos** da sua bike.
4. Toque em **"Salvar"**.
5. Toque em **"Conectar"**.
6. Vai abrir a lista de dispositivos Bluetooth do celular — escolha a sua bike na
   lista.
7. O app vai autenticar sozinho com a bike (isso é automático, alguns segundos).
   Se der tudo certo, aparecem os controles na tela.

---

## ⚠️ AVISO IMPORTANTE — senha errada 3 vezes seguidas

**Se você errar a senha de pareamento 3 vezes seguidas, a própria bicicleta
ESQUECE o pareamento**, e você vai precisar parear tudo de novo (procedimento mais
demorado, geralmente descrito no manual da bike).

O app conta as tentativas erradas e, antes de mandar a 3ª tentativa, mostra uma
pergunta de confirmação na tela perguntando se você tem certeza que quer continuar.
Mas atenção: **quem realmente conta as tentativas é a bike, não o app.** O contador
do app é só um aviso para te ajudar — se por algum motivo os dois contadores saírem
de sincronia (por exemplo, se você usar outro app para tentar conectar), confie
sempre no que a bike faz, não no número mostrado aqui.

---

## 4. Se a bike RECUSAR a senha de pareamento (CONNECT_TYPE errado)

Existem 3 "tipos de conexão" possíveis (CONNECT_TYPE 1, 2 e 3) e não tem como saber
de antemão qual é o da sua bike. Antes desta versão, quando o tipo estava errado o
app só mostrava "Tempo esgotado esperando resposta", o que confundia bastante —
parecia problema de sinal, mas na verdade a bike já tinha respondido "chave errada".

Agora o app reconhece na hora quando a bike recusa a chave (mensagem `+PM=NG` ou
`+PM>NG`) e mostra direto: **"A bike RECUSOU a chave de autenticação... troque o
Tipo de conexão para 2 e tente de novo. Se também recusar, tente o tipo 3."** Não é
mais preciso adivinhar — basta seguir a mensagem na tela. Se ainda assim der tempo
esgotado em algum passo, olhe a última linha do Console: se ela terminar em `NG`,
também é sinal de CONNECT_TYPE errado.

---

## 5. Escolheu a bike errada na lista do Bluetooth? Use "Escolher outra bike"

Se você ligou "Mostrar todos os dispositivos no scan", a lista do Bluetooth vem
grande (fone, TV, carro, etc.) e é fácil tocar no aparelho errado sem querer. Antes,
depois de escolher errado, não tinha mais jeito de trocar — era preciso fechar o app
à força.

Agora tem um botão **"Escolher outra bike"** nas telas de "Desconectado" e de
"Erro" (ele só aparece depois que você já escolheu algum aparelho pelo menos uma
vez). Tocando nele, o app esquece o aparelho escolhido e, na próxima vez que você
tocar em **Conectar**, a lista do Bluetooth abre de novo do zero.

Além disso, se você conectar num aparelho que **não é a bike** (não tem o serviço
esperado), o app agora percebe isso sozinho, esquece o aparelho automaticamente e
avisa: "Esse aparelho não é a sua bike... Toque em Conectar e escolha outro da
lista." — você não precisa nem tocar no botão nesse caso.

---

## 6. Destravar automaticamente ao conectar (opcional)

Nas Configurações tem a opção **"Destravar automaticamente ao conectar"**. Ela vem
**desligada por padrão**, de propósito — por segurança, a bike nunca deve destravar
sozinha sem você pedir.

Se você ligar essa opção, a bike já destrava sozinha assim que o app termina de
conectar (é um toque a menos no dia a dia). O cuidado é o seguinte: **se você abrir
o app sem querer** (por exemplo, o celular esbarrou na tela), a bike vai destravar
sozinha também. Só ligue essa opção se você tiver certeza de que isso não é um
problema para o seu uso.

---

## 7. Se a bike não aparecer na lista do Bluetooth

Isso é comum: algumas bikes não anunciam o "tipo" de Bluetooth que o app procura
por padrão, então a lista aparece vazia.

**Solução:** abra a engrenagem (⚙️) > Configurações, e ligue a opção
**"Mostrar todos os dispositivos no scan"**. Com isso ligado, a lista do Bluetooth
vem maior (com todos os aparelhos por perto), e você precisa achar a sua bike pelo
nome dela na lista.

---

## 8. Confirmando que a trava/destrava realmente aconteceu

Antes, quando você tocava para travar ou destravar, o app confiava só no "eco" que a
bike mandava de volta — se por algum motivo o comando não pegasse de verdade, você
poderia sair andando achando que tinha trancado sem ter trancado.

Agora, depois de travar ou destravar, o app **reconsulta a bike de novo** para
confirmar o estado real, e mostra o resultado embaixo do botão principal:

- **"Confirmado pela bike às HH:MM:SS"** — deu certo, pode confiar.
- **"A bike não confirmou — verifique a trava fisicamente"** (em vermelho) — a bike
  não confirmou o comando. **Não confie só no app nesse caso: olhe a trava com os
  próprios olhos antes de sair.**

---

## 9. Usando o Console para ver a telemetria da bike

No rodapé da tela tem uma seção **"Console"** — toque nela para abrir. Ali aparece
tudo que o app manda para a bike e tudo que a bike responde, em tempo real.

Para descobrir informações que o app ainda não mostra na tela (por exemplo, dados
de velocidade, bateria, etc. que a bike manda sozinha):

1. Conecte normalmente e deixe o Console aberto.
2. Ande com a bike um pouco, ligando e desligando funções (farol, modo, etc.).
3. Toque em **"Copiar"** para copiar todo o histórico do console.
4. Cole esse texto num lugar (bloco de notas, WhatsApp para você mesmo, etc.) para
   analisar depois com calma, ou para mandar para quem for ajudar a entender os
   comandos da bike.

O botão **"Limpar"** apaga o histórico da tela (não desfaz nada na bike).

---

## 10. Limitações honestas

Este app foi construído com bastante cuidado, mas é importante saber exatamente o
que já foi confirmado e o que ainda não foi:

- Os vetores usados no botão **"Testar hash"** (dentro de Configurações) são de
  **regressão**: eles garantem que o cálculo do app não mudou por engano numa
  edição futura. Eles **não provam** que esse cálculo bate com a bike de verdade.
- O algoritmo foi conferido por **duas implementações independentes**, que deram
  exatamente o mesmo resultado. Isso confirma que o algoritmo foi transcrito
  corretamente — **não confirma** que ele é compatível com o hardware real da bike.
- A prova de verdade só acontece na hora de conectar numa bike real, quando aparece
  a mensagem **CODE_OK** (senha aceita). Antes disso, o app já avisa no Console se
  a resposta do passo `+PA>` da bike não bateu com o valor calculado — esse é o
  primeiro sinal de que o **CONNECT_TYPE** configurado está errado.
- Se a autenticação não funcionar, tente trocar o **CONNECT_TYPE** nas
  Configurações: primeiro tente **2**, depois **3**.
- **Nada disso foi testado numa X50 real ainda.** Use com atenção na primeira vez,
  de preferência com a bike parada e por perto.

---

## 11. O que não tem neste app (de propósito)

Comandos de limitador de velocidade foram **deixados de fora de propósito** — não
fazem parte deste app e não serão adicionados.

---

## 12. Gravando um log persistente para decifrar a telemetria

Além do Console (que mostra tudo em tempo real mas esquece quando você fecha o
app), o app também **grava um log persistente** de tudo que a bike manda. Esse
log fica guardado no celular e **sobrevive a fechar o app**, trocar de tela ou o
iPhone suspender o app sozinho.

### Como fazer uma boa captura

1. Abra a engrenagem (⚙️) > Configurações e confira se **"Gravar log da bike
   (para descobrir a telemetria)"** está ligado — ele já vem **ligado por
   padrão**.
2. Conecte na bike normalmente.
3. Mantenha o celular **desbloqueado e com o app aberto** durante o passeio. Se
   a tela apagar ou o app for para segundo plano, a conexão Bluetooth cai e a
   captura para de receber dados. O app tenta manter a tela acesa sozinho (veja
   a seção abaixo), mas isso não funciona em todos os navegadores — não confie
   só nisso.
4. Toque em **"Marcar momento"** (na tela de controles, logo abaixo dos botões
   da grade) toda vez que fizer algo que depois você vai querer relacionar com
   os números crus: ligar o farol, começar a pedalar, parar, colocar para
   carregar, olhar quantas barras de bateria a bike está mostrando no visor
   dela, etc. Também tem 4 botões de atalho — **"Parado"**, **"Pedalando"**,
   **"Carregando"**, **"Bateria cheia"** — para quando digitar não é prático
   (por exemplo, andando de bike).
5. Ao terminar, vá em Configurações > **Captura** e toque em **"Exportar
   captura"** para salvar o arquivo (no iPhone, isso abre o compartilhamento do
   sistema — dá para salvar em Arquivos, mandar por e-mail ou WhatsApp para
   você mesmo). Guarde esse arquivo.

### Por que as marcações importam

Sem marcações, os números que a bike manda sozinha são só uma sequência de
caracteres — não dá para saber qual é a bateria, qual é a velocidade e qual é a
distância. Com marcações (por exemplo, "bateria mostrando 3 barras" registrada
bem antes de uma linha específica), dá para comparar o que mudou nos números
crus exatamente naquele momento e deduzir o que cada campo significa. Quanto
mais marcações, mais fácil decifrar.

### Anotar leitura do app oficial (a "pedra de Roseta" da telemetria)

As marcações da seção anterior dizem *o que* está acontecendo ("comecei a
pedalar", "bateria mostrando 3 barras"), mas não dão o número exato. Para
decifrar de verdade qual linha crua carrega o hodômetro (ODO), a bateria e a
velocidade, é preciso casar um número **exato** com a linha crua daquele
instante — e o único lugar que mostra esses números certinhos é o **app
oficial da iNow**.

O problema é que o Bluetooth da bike só aceita **um app conectado por vez**.
Não dá para deixar o app oficial e este PWA conectados ao mesmo tempo. Por
isso o procedimento é em etapas:

1. Abra o **app oficial da iNow** e conecte na bike.
2. Veja os números na tela dele: velocidade (km/h), "Viagem" (km), bateria
   (%) e ODO (km).
3. **Feche o app oficial** (para liberar o Bluetooth).
4. Conecte com **este PWA**.
5. Toque em **"Anotar leitura do app oficial"** — o botão aparece tanto na
   tela de controles (perto de "Marcar momento") quanto em Configurações >
   Captura — e digite os números que você acabou de ver. Pode preencher só
   os que você conseguiu ver; os campos vazios simplesmente não entram na
   anotação.

Faça isso **sem pedalar** entre ver os números no app oficial e anotar aqui,
para os valores continuarem valendo quando forem gravados.

Cada leitura vira uma linha estruturada no log, fácil de comparar depois com
as linhas cruas da bike no mesmo instante:

```
LEITURA-OFICIAL ODO=65.6 BAT=70 VIAGEM=0.5 VEL=0 OBS=texto livre
```

**2 ou 3 leituras assim, feitas em momentos com valores DIFERENTES** (por
exemplo, uma leitura antes de pedalar um pouco e outra depois, com o ODO e a
Viagem tendo mudado) **valem muito mais que 10 leituras iguais** — é a
diferença entre duas leituras que mostra qual parte da linha crua está
variando junto com qual número.

### Limite da captura

A captura guarda no máximo **5000 linhas**. Ao chegar em 4500 linhas (90%), o
app mostra um aviso na tela pedindo para exportar e limpar. Ao chegar em 5000,
ele **para de gravar sozinho** — sem apagar o que já tem, porque o começo da
conversa com a bike (o handshake) é o mais valioso — e avisa que é preciso
exportar e limpar antes de continuar gravando.

Nas Configurações, o bloco **"Captura"** sempre mostra quantas linhas já estão
guardadas, desde quando (data e hora da mais antiga) e o tamanho aproximado em
KB.

### Tela acesa durante a captura

Enquanto estiver conectado e com a captura ligada, o app tenta pedir ao
navegador para manter a tela do celular acesa. Isso nem sempre funciona
(depende do navegador/versão) — por isso o mais seguro ainda é manter o celular
desbloqueado e o app aberto na tela durante o teste.

### Depois de decifrar a telemetria

Quando já souber o que cada número significa, pode desligar **"Gravar log da
bike"** nas Configurações. O app continua funcionando normalmente sem a
gravação persistente — só o Console em tempo real (que já existia) continua
ativo.

---

## 13. A conexão cai sozinha depois de alguns segundos

Se o Console mostra que a conexão foi aberta, mas alguns segundos depois a bike
desconecta sozinha (`gattserverdisconnected`) antes de terminar de preparar,
isso quase sempre é **outro aplicativo segurando a bike** — o Bluetooth dela só
aceita um app conectado por vez (o mesmo problema explicado na seção sobre
telemetria acima).

**Solução:**

1. Feche o **app oficial da iNow** de vez, arrastando-o para cima na lista de
   apps recentes (só voltar para a tela inicial **não fecha** o app, ele
   continua rodando e segurando o Bluetooth).
2. Desligue e ligue a bike.
3. Tente conectar de novo.

Nesse caso o app não te obriga a escolher a bike na lista de novo — ele mantém
o aparelho já escolhido e só pede para tentar uma vez mais.

---

## 14. Conecta, acha o serviço, mas falha nos canais

Se o Console mostra que a conexão abriu e o serviço da bike foi encontrado, mas
o app trava (ou dá erro) logo depois disso, o problema está nos **canais**
(características) dentro do serviço — os UUIDs que o app espera podem não ser
exatamente os que essa bike oferece.

Para não ficar chutando, o app agora **lista no Console todos os canais que a
bike realmente ofereceu**, com o UUID de cada um e o que ele permite (leitura,
escrita, notificação etc.). Se os canais esperados não estiverem nessa lista,
o app avisa e não esquece o aparelho escolhido (ele está certo — só falta
confirmar o UUID correto).

**O que fazer:** abra o **Console** (na tela principal, embaixo), toque em
**Copiar** e mande esse log para análise — a lista de canais reais está ali.
