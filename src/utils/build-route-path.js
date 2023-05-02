export function buildRoutePath(path) {
    // Find parameters
    const routeParametersRegex = /:([a-zA-Z]+)/g
    
    // Criar grupos com cada route parameter
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // Cria grupo dos query parameters
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    
    return pathRegex
}