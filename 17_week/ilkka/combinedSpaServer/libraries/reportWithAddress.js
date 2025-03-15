'use strict';

const { getAddressOfOrder } = require('./addressLibrary');
const fetch = require('./fetchLib');

module.exports = class Reporter{
    #orderBaseUrl
    #computerBaseUrl
    constructor(orderBaseUrl, computerBaseUrl){
        this.#orderBaseUrl = orderBaseUrl;
        this.#computerBaseUrl = computerBaseUrl;
    }

    async createReportWithAddress(ordernumber) {
        const data = await fetch(`${this.#orderBaseUrl}/${ordernumber}`);
        const orders=await data.json();

        const result={};
        
        if (orders.length > 0) {
            result.customer = getAddressOfOrder(orders[0]);
        }
        else {
            result.customer = {
                firstname: '',
                lastname: '',
                address: {
                    street: '',
                    postcode: '',
                    country: ''
                }
            }
        }
        result.report=await this.#createFullReport(orders);
    
        return result;
    }

    async #createProductLine(product) {
        const computerData = await fetch(`${this.#computerBaseUrl}/${product.productId}`);
        const computers = await computerData.json();
        

        if(computers.length>0){
            const computer=computers[0];
            return {
                productId: computer.id,
                productname: computer.name,
                price: computer.price,
                amount: product.amount,
                rowTotal: product.amount * computer.price
            };
        }

        return null;
    }

    async #createFullReport(orders) {
        
        let totalSum = 0;
        const lines = [];
        if (orders.length > 0) {
            for (const product of orders[0].products) {
                const line = await this.#createProductLine(product);
                if(line){
                    lines.push(line);
                    totalSum += line.rowTotal;
                } 
            }
        }
        return {
            lines,
            totalSum
        }
    }

} //end of class


