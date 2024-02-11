type AdminPanel_ =  ({ options }) => React.ReactNode;
type useAdminPanel_ = () => object;
type useAdminSection_ = () => object;

/*~ Admin panel component for render in your project
 *~ About param options - https://github.com/dencelman1/anyback-react/wiki/options
 */
export declare var AdminPanel: AdminPanel_;

// soon..
export declare var useAdminPanel: useAdminPanel_;

// soon..
export declare var useAdminSection: useAdminSection_;

// https://github.com/dencelman1/anyback-react/wiki
declare var AnyBack: {
    AdminPanel: AdminPanel_,
    useAdminPanel: useAdminPanel_,
    useAdminSection: useAdminSection_,
}

// https://github.com/dencelman1/anyback-react/wiki
export default AnyBack;
