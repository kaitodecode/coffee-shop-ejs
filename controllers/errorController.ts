import { Request, Response } from "express"
export const pageNotFound = (req: Request, res: Response) => {
    res.render("errors/404")
}

export const serverError = (req: Request, res: Response) => {
    res.redirect("/html/500.html")
}
