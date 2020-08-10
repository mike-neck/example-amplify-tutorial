import {CSSProperties} from "react";

export interface Styles {
    container: CSSProperties;
    todo: CSSProperties;
    input: CSSProperties;
    todoName: CSSProperties;
    todoDescription: CSSProperties;
    button: CSSProperties;
}

export const styles: Styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}
