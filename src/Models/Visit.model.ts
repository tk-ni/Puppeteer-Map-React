export default class Visit{
    id: String;
    url: String;
    date: String;
    src: String;
    
    constructor(id: string, url: string,date: string, src: string){
        this.id = id;
        this.url = url;
        this.date = date;
        this.src = src;
    }
}