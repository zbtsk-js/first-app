import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async SendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                html: `<div><h1>Activate your account on Snuss.com</h1> <a href="${link}">${link}</a> </div>`
            })
        } catch (e) {
            throw e
        }
    }

    async SuccessfullPurchase({to, ProductData, OrderData}) {
        try {
            const enrichedItems = ProductData.map( (product) => {
                return {
                    title: product.title ,
                    subtitle: product.subtitle,
                    imageSrc: product.imageSrc,
                    quantity: product.quantity,
                    price: product.price , // fallback
                    totalItemPrice: product.price*product.quantity
                };
            });

            const subtotal = enrichedItems.reduce((sum, item) => sum + item.totalItemPrice, 0);
            const shipping = 0;
            const tax = 0;
            const total = OrderData.amount || (subtotal + shipping + tax);
            const orderNumber = OrderData._id.toString();

            const itemsHtml = enrichedItems.map(item => `
            <div style="display:flex; align-items:center; padding:18px 0; border-bottom:1px solid #222222;">
                <img src="${process.env.API_URL}${item.imageSrc}" alt="${item.title}"
                     style="width:75px; height:75px; object-fit:contain; background:#1A1A1A; padding:6px; border-radius:6px; margin-right:18px;">
                <div style="flex:1;">
                    <strong style="color:#E0E0E0; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">${item.title}</strong>
                    <p style="color:#888888; font-size:14px; margin:4px 0 0; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">${item.subtitle || ''} • ${item.quantity} pcs</p>
                </div>
                <div style="font-weight:600; color:#00ff9d; font-size:16px; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">${item.totalItemPrice.toFixed(2)} NOK</div>
            </div>
            `).join('');

            await this.transporter.sendMail({
                from: `"NORDBOX" <${process.env.SMTP_USER}>`,
                to,
                subject: `Your order #${orderNumber.slice(-6).toUpperCase()} — NORDBOX`,
                html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your order #${orderNumber} — NORDBOX</title>
</head>
<body style="margin:0; padding:0; box-sizing:border-box; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; background:#000000; color:#E0E0E0; line-height:1.5;">

    <div style="max-width:600px; margin:20px auto; background:#111111; border:1px solid #222222; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.5);">

        <!-- Header -->
        <div style="padding:40px 20px; text-align:center; background:#1A1A1A; border-bottom:1px solid #222222;">
            <img src="https://eywxrhi.stripocdn.email/content/guids/CABINET_887f48b6a2f22ad4fb67bc2a58c0956b/images/93351617889024778.png"
                 alt="NORDBOX" style="max-width:160px; filter: brightness(1.2);">
        </div>

        <!-- Hero -->
        <div style="text-align:center; padding:40px 20px;">
            <div style="display:inline-block; background:rgba(0, 255, 157, 0.1); padding:15px; border-radius:50%; margin-bottom:20px;">
                <img src="https://eywxrhi.stripocdn.email/content/guids/CABINET_c0e87147643dfd412738cb6184109942/images/151618429860259.png"
                     alt="Success" style="width:60px; display:block;">
            </div>
            <h1 style="font-size:28px; color:#ffffff; margin:0 0 10px; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; letter-spacing:-0.5px;">Order Confirmed</h1>
            <p style="font-size:16px; color:#00ff9d; margin:0 0 25px; font-family:Arial,'Helvetica Neue',Helvetica,sans-serif; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Order № ${orderNumber.slice(-6).toUpperCase()}</p>
            <div style="height:1px; background:linear-gradient(to right, transparent, #333333, transparent); margin:0 40px;"></div>
        </div>

        <!-- Customer Data -->
        <div style="padding:0 30px 30px;">
            <h3 style="color:#ffffff; font-size:14px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Shipping Details</h3>
            <div style="background:#161616; padding:20px; border-radius:8px; border:1px solid #222222;">
                <p style="margin:0; color:#E0E0E0; font-size:15px;"><strong>${OrderData.customerData.firstName} ${OrderData.customerData.lastName}</strong></p>
                <p style="margin:5px 0 0; color:#888888; font-size:14px; line-height:1.4;">
                    ${OrderData.customerData.address}<br>
                    ${OrderData.customerData.postcode} ${OrderData.customerData.city}<br>
                    ${OrderData.customerData.country}
                </p>
                <p style="margin:12px 0 0; color:#888888; font-size:14px;">${OrderData.customerData.phone}</p>
            </div>
        </div>

        <!-- Items -->
        <div style="padding:0 30px;">
            <h3 style="color:#ffffff; font-size:14px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Your Items</h3>
            ${itemsHtml}
        </div>

        <!-- Totals -->
        <div style="margin:30px; background:#161616; padding:25px; border-radius:8px; border:1px solid #222222;">
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td style="padding:5px 0; color:#888888; font-size:14px;">Subtotal</td>
                    <td style="padding:5px 0; color:#E0E0E0; font-size:14px; text-align:right;">${subtotal.toFixed(2)} NOK</td>
                </tr>
                <tr>
                    <td style="padding:5px 0; color:#888888; font-size:14px;">Shipping</td>
                    <td style="padding:5px 0; color:#E0E0E0; font-size:14px; text-align:right;">FREE</td>
                </tr>
                <tr style="border-top:1px solid #333333;">
                    <td style="padding:15px 0 0; color:#ffffff; font-size:18px; font-weight:700;">Total</td>
                    <td style="padding:15px 0 0; color:#00ff9d; font-size:22px; font-weight:700; text-align:right;">${total.toFixed(2)} NOK</td>
                </tr>
            </table>
        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:30px; background:#1A1A1A; border-top:1px solid #222222;">
            <p style="color:#888888; font-size:13px; margin:0 0 15px;">If you have any questions, please contact our support.</p>
            <div style="font-size:12px; color:#555555; text-transform:uppercase; letter-spacing:2px;">
                © 2024 NORDBOX. ALL RIGHTS RESERVED.
            </div>
        </div>

    </div>

    <div style="text-align:center; padding:20px; color:#444444; font-size:11px;">
        You received this email because you made a purchase at nordbox.com
    </div>

</body>
</html>`
            });
        } catch (e) {
            console.error('Mail sending error:', e);
            throw e;
        }
    }
}
