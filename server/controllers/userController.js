import { Webhook } from "svix"
import userModel from "../models/userModel.js"

const clerkWebhooks = async (req, res) => {

    try {

        // Create a Svix instance with clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await webhook.verify(JSON.stringify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }))

        const { data, type } = req.body

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_address[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await userModel.create(userData)
                res.json({ success: true, message: "Usuario creado exitosamente" })
                break;
            }   
            case "user.updated": {
                const userData = {
                    email: data.email_address[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json({ success: true, message: "Usuario actualizado exitosamente" })
                break;
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({ success: true, message: "Usuario eliminado exitosamente" })
                break;
            }
            default:
                break;
        }

    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }

}

export { clerkWebhooks }