declare interface AnyBack {
    AdminPanel: ({ options }) => React.ReactNode,
    useAdminPanel: () => object,
    useAdminSection: () => object,
}

export default AnyBack;
