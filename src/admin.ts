import './admin/style.css';
import {mountAdmin} from './admin/editor';
import {adminAPI} from './admin/api';
void mountAdmin(document.querySelector('#admin')!,adminAPI);
