/**
 * Check the current navigation item is active
 * @param targetPath the target path
 * @param exact whether only the exact link should be equal
 * @param currentPath the current path of the brwoser
 * @returns true if the current path equals the targeted path
 */
export const isNavActive = (targetPath: string, exact: boolean, currentPath: string) =>
  exact ? currentPath === targetPath : currentPath.startsWith(targetPath)
