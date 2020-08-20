import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure({ position: 'bottom-center' });

const { info, warn, error, success } = toast;

export { info, warn, error, success };
