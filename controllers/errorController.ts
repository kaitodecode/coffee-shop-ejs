import { Request, Response } from "express"
export const pageNotFound = (req: Request, res: Response) => {
    res.render("errors/404",{path:"/errors/404"})
}

export const serverError = (req: Request, res: Response) => {
    res.render("errors/500",{path:"/errors/500"})
}

export const badRequest = (req: Request, res: Response) => {
    res.render("errors/400",{path:"/errors/400"})
}

export const unauthorized = (req: Request, res: Response) => {
    res.render("errors/401",{path:"/errors/401"})
}

export const forbidden = (req: Request, res: Response) => {
    res.render("errors/403", {path:"/errors/403"})
}