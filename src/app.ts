import 'dotenv/config'
import { createBot, MemoryDB, createProvider } from '@bot-whatsapp/bot'
import { TelegramProvider } from '@builderbot-plugins/telegram'
import { BaileysProvider } from '@bot-whatsapp/provider-baileys'
import QRPortalWeb from '@bot-whatsapp/portal';

import AIClass from './services/ai';
import flows from './flows';

const ai = new AIClass(process.env.OPENAI_API_KEY, 'gpt-3.5-turbo-1106')



const main = async () => {

    const provider = createProvider(BaileysProvider)
    // const provider = createProvider(TelegramProvider, { token: process.env.TELEGRAM_API ?? '' })

    await createBot({
        database: new MemoryDB(),
        provider,
        flow: flows
    }, { extensions: { ai } })
    QRPortalWeb()
}

main()