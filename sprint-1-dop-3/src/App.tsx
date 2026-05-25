import {useState} from 'react';
import './App.css';
import {Country} from "./Country";
import {v1} from "uuid";

export type BanknotsType = 'USD' | 'RUB' | 'All'// создадим типы для banknotes -он может быть 'DOLLARS', 'RUBLS' или 'All'
export type MoneyType = {
    banknote: BanknotsType
    nominal: number// не ленимся, убираем заглушку, и пишем правильный тип)
    id: string// ложку за Димыча, за...
}

let defaultMoney: MoneyType[] = [  // типизируем
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
]


export const moneyFilter = (money: MoneyType[], filter: BanknotsType): MoneyType[] => {
    //если пришел filter со значением 'All', то возвращаем все банкноты
    //return money.filter... ну да, придется фильтровать
    if(filter === "All") return money
    return money.filter(el => el.banknote === filter)

}


export const App = () => {
    // убираем заглушки в типизации и вставляем в качестве инициализационного значения defaultMoney
    const [money, setMoney] = useState<MoneyType[]>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>("All")   // по умолчанию указываем все банкноты

    // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
    // в функцию передаем деньги и фильтр, по которому ихбудем выдавать(ретёрнуть)
    const filteredMoney = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        const newBanknot = {banknote, nominal: 100, id: v1()}
        setMoney([ ...money, newBanknot])
        // Добавление денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
    }

    const removeMoney = (banknote: BanknotsType) => {
        // Снятие денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
        const index = money.findIndex((el, ) => el.banknote === banknote)
         if (index !== -1) {
             setMoney(money.filter((_el, i) => i !== index));
         }

    }

    return (
        <div className="App">
            <Country
                data={filteredMoney}   //отрисовать будем деньги после фильтрации
                setFilterValue={setFilterValue}//useState передаем? Так можно было?!
                addMoney={addMoney}
                removeMoney={removeMoney}
            />
        </div>
    );
}
