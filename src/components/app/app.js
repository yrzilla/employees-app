import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: "Chris H.", salary: 500, increase: false,rise: false, id: 1},
                {name: "Robert D.", salary: 3000, increase: false,rise: false, id: 2},
                {name: "Chris E.", salary: 1800, increase: false,rise: false, id: 3}
            ],
            term: "",
            filter: "all"
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) =>{
            // const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = {...before, ...after};
            return {
                data: data.filter(item => item.id !== id) // Данные отфильтруются и остануться те элементы id которого не совпадает с тем который пришел
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => { // Менять рандомное свойство переданное как аргумент prop 
        this.setState(({data}) => ({ // Для изменения state мы возвращаем новый обьект у которого свойство data, (data.map возвращает новый массив)
            data: data.map(item => { // После перебора каждого обьекта и если совпали id то мы нашли нужный обьект и возвращаем новый обьект
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => { //в виде аргументов приходит массив данных который будем фильтровать и строка по которой искать
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary>1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length; // общее количество сотрудников
        const increased = this.state.data.filter(item => item.increase).length; // перебираем обьект и выбираем только те у которых increase true
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo
                    employees={employees}
                    increased={increased}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;