export default function toBcbPrefix(value = '') {

    return String(value).replace(/^xrb/, 'bcb');

}