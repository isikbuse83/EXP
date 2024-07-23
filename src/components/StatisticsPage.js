import { Doughnut } from "react-chartjs-2";
import React from "react";

const StatisticsPage = () => {
    const data = {
        labels: ['Shopping','Credit Card'],
        datasets: [{
            data: [10, 3],
            backgroundColor:[
                '#F1ACF2',
                '#F0F0F2',
                '#9F79F2',
                '#03A65A',
                '#F2C9CC',
                '#918ABF',
                '#F2E0BD',
                '#F2BC57',
                '#D99873',
                '#F29985',
            ]
            

        }]
    }


    return <div
    style={{maxWidth:'35rem', maxHeight:'35rem',margin:'auto',textAlign:'center'}}>
        <h4 style={{marginTop:'10px'}}> Expenses per Category</h4>
        <Doughnut data={data}    />




    </div>

};

export default StatisticsPage;