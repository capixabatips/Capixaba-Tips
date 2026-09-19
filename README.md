# Capixaba Tips

Aplicativo web/PWA gratuito para organizar análises esportivas por faixa de odd.

## Faixas
- **Odd baixa:** 1.25 a 4.00
- **Odd alta:** 5.00 a 100.00
- **Free:** análises públicas
- **VIP:** área protegida para assinantes

> As categorias "baixa", "alta", "Free" e "VIP" são apenas classificações do produto. Nenhuma aposta é garantida ou "segura".

## Publicar grátis no GitHub Pages

1. Crie um repositório no GitHub chamado `capixaba-tips`.
2. Envie os arquivos deste projeto.
3. Em **Settings → Pages**, selecione **GitHub Actions**.
4. O workflow `.github/workflows/pages.yml` publica a pasta `docs`.

O site funciona sem servidor e salva configurações locais no navegador.

## Automação

O arquivo `automation/worker.py` mostra a estrutura de um worker que:
1. lê um feed de odds configurado;
2. filtra Betano e bet365;
3. classifica por faixa de odd;
4. gera a mensagem;
5. publica no Telegram quando configurado.

Para WhatsApp, use a **WhatsApp Business Platform/Cloud API** ou outro provedor oficial. Nunca coloque tokens no código ou no frontend.

### Variáveis sugeridas

```text
ODDS_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TO=
VIP_ENABLED=false
```

As credenciais devem ficar em **GitHub Actions Secrets**, não no repositório.

## Fonte de odds

O projeto usa uma interface (`OddsProvider`) para que você conecte uma fonte de dados autorizada. Não há scraping de Betano/bet365 incluído. Se você tiver uma API/feed que contenha essas casas, configure o adaptador para identificar `bookmaker` como `Betano` ou `bet365`.

## Licença

MIT.
