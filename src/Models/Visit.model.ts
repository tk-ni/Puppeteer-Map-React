export default class Visit{
    id: string;
    url: string;
    date: string;
    src: string;
    vertex: any;
    constructor(id: string, url: string,date: string, src: string, vertex: object){
        this.id = id;
        this.url = url;
        this.date = date;
        this.src = src;
        this.vertex = vertex;
    }
}