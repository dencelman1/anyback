import AnyBackAdminPanel from './AnyBackAdminPanel.jsx';
import { useAdminPanel } from './hooks/useAdminPanel.js';
import useAdminSection from './hooks/useAdminSection.js';

var AnyBack = {
    AdminPanel: AnyBackAdminPanel,
    useAdminPanel,
    useAdminSection,
}

export default AnyBack;
