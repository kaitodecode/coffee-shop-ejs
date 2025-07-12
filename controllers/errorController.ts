import { Request, Response } from "express"
export const pageNotFound = (req: Request, res: Response) => {
    res.render("errors/404",{path:"/errors/404"})
}

export const serverError = (req: Request, res: Response) => {
    res.redirect("errors/500")
}

export const badRequest = (req: Request, res: Response) => {
    res.redirect("errors/400")
}

export const unauthorized = (req: Request, res: Response) => {
    res.redirect("errors/401")
}

