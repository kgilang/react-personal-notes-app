import { createRoot } from 'react-dom/client';
import PersonalNoteApp from './components/PersonalNoteApp';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<PersonalNoteApp />);
