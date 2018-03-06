class Events {
    static mapped = [];

    static subscribe(name, cb) {
        let item = {
            name: name,
            callback: cb
        };
        this.mapped.push(item);
        this.dump('subscribe', name);
    }

    static unsubscribe(name) {
        let newMap = [];
        this.dump('unsubscribe', name);

        this.mapped.forEach((item) => {
            if (item.name !== name) {
                newMap.push(item);
            }
        })
        this.mapped = newMap;
    }

    static notify(name, data) {
        this.dump('notify', name);
        this.mapped.forEach((item) => {
            if (item.name === name) {
                item.callback(data);
            }
        })
    }

    static dump(method, methodName) {
        // this.mapped.forEach((item) => {
        //     let s = method + ', name: ' + item.name;
        //     if (item.name === methodName) {
        //         s = s + ' <**> ';
        //     }
        //     console.log(s);
        // });
    }
}

export default Events;