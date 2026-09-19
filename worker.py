"""
Capixaba Tips - worker de automação.

Este arquivo é um esqueleto seguro: você conecta uma fonte de odds autorizada
e as APIs oficiais de mensagem usando secrets do ambiente.

Não faça scraping de sites protegidos nem publique credenciais no GitHub.
"""

from dataclasses import dataclass
from typing import Iterable, Optional
import os, json, urllib.request

@dataclass
class Selection:
    league: str
    home: str
    away: str
    market: str
    odd: float
    bookmaker: str
    kickoff: str
    tier: str = "free"

def classify(odd: float) -> Optional[str]:
    if 1.25 <= odd <= 4.00:
        return "odd_baixa"
    if 5.00 <= odd <= 100.00:
        return "odd_alta"
    return None

def bookmaker_allowed(name: str) -> bool:
    n = name.strip().lower()
    return n in {"betano", "bet365", "bet365.com"}

def build_message(s: Selection) -> str:
    faixa = "Odd baixa" if 1.25 <= s.odd <= 4 else "Odd alta"
    return (
        f"🏆 CAPIXABA TIPS\n\n"
        f"{s.league}\n{s.home} x {s.away}\n"
        f"Mercado: {s.market}\n"
        f"Odd: {s.odd:.2f}\n"
        f"Casa: {s.bookmaker}\n"
        f"Faixa: {faixa}\n"
        f"⏰ {s.kickoff}\n\n"
        f"⚠️ Análise não é garantia de resultado."
    )

def send_telegram(text: str) -> None:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return
    data = urllib.parse.urlencode({"chat_id": chat_id, "text": text}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=data)
    urllib.request.urlopen(req, timeout=15).read()

def main(feed: Iterable[Selection]):
    for s in feed:
        if not bookmaker_allowed(s.bookmaker):
            continue
        if not classify(s.odd):
            continue
        msg = build_message(s)
        print(msg)
        # send_telegram(msg)
        # Envie para WhatsApp usando a API oficial e secrets.
        # Publique no backend do app via endpoint autenticado.

if __name__ == "__main__":
    # Substitua por dados vindos da sua API/feed.
    demo = [
        Selection("Brasileirão","Time A","Time B","Mais de 1,5 gols",1.55,"Betano","Hoje 20:00"),
        Selection("Liga","Time C","Time D","Dupla chance",6.20,"bet365","Hoje 22:00"),
    ]
    main(demo)
