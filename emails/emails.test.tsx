import { render } from "react-email"
import { describe, expect, it } from "vitest"
import ContactAck from "@/emails/contact-ack"
import NewsletterWelcome from "@/emails/newsletter-welcome"

describe("email templates", () => {
  it("welcome renders in both languages with the unsubscribe link", async () => {
    const es = await render(<NewsletterWelcome lang="es" unsubscribeUrl="https://x.test/u?token=1" />)
    expect(es).toContain("Listo, estás dentro.")
    expect(es).toContain('href="https://x.test/u?token=1"')
    expect(es).toContain('lang="es"')
    const en = await render(<NewsletterWelcome lang="en" unsubscribeUrl="https://x.test/u" />, { plainText: true })
    expect(en).toMatch(/you.re in/i)
    expect(en).toContain("Unsubscribe")
  })
  it("contact ack quotes the message and uses the exact Spanish copy", async () => {
    const html = await render(<ContactAck lang="es" name="Ana" message="Hola <b>mundo</b>" />)
    expect(html).toContain("Gracias, Ana.")
    expect(html).toContain("Recibí tu mensaje. Me pondré en contacto contigo antes de las siguientes 48 horas.")
    expect(html).toContain("Hola &lt;b&gt;mundo&lt;/b&gt;")
  })
})
