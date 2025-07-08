export const layoutMiddleware = (req: any, res: any, next: any) => {
    if (req.path.startsWith('/app')) {
        res.locals.layout = 'layouts/appLayout';
    } else {
        res.locals.layout = 'layouts/layout';
    }
    console.log(`Path: ${req.path}, Using layout: ${res.locals.layout}`);
    next();
};


