import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    getItem(key: string): any {
        return localStorage.getItem(key);
    }

    setBool(key: string, value: boolean) {
        localStorage.setItem(key, String(value));
    }

    getBool(key: string): boolean {
        return localStorage.getItem(key) === 'true';
    }

    setObject(key: string, value: object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getObject(key: string): object {
        return JSON.parse(localStorage.getItem(key));
    }

    removeObject(key: string) {
        return localStorage.removeItem(key);
    }

    getAllObjects() {
        let allObjects: Array<object> = []
        for (let i = 0; i < localStorage.length; i++) {
            let name = localStorage.key(i);
            let status = JSON.parse(localStorage.getItem(name));
            allObjects.push({ name, status })
        }
        return allObjects;
    }

    clearLocalStorage() {
        return localStorage.clear();
    }
}