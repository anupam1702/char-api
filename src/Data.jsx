import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Chart from 'react-apexcharts'

const Data = () => {
    const [chartData,setChartData]=useState({});
    
    useEffect(()=>{
      const fetchData=async()=>{
        try{
            const respone=await axios.get("https://checkinn.co/api/v1/int/requests")

            const info=respone.data.requests;
            const hotelNames=info.map(infos=> infos?.hotel.name);

            const hotelCounts = {};
                hotelNames.forEach(name => {
                    hotelCounts[name] = (hotelCounts[name] || 0) + 1;
                });
                // console.log(hotelCounts);

                const uniqueHotelNames = Object.keys(hotelCounts);
                // console.log(uniqueHotelNames);
                const hotelCountsData = uniqueHotelNames.map(name => ({
                    name: name,
                    data: hotelCounts[name]
                }));
                console.log(hotelCountsData);


            setChartData({options: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories:hotelCountsData.map(num=>num.name)
                },
                yaxis: {
                    min: 0 
                  }
              },
              series: [{
                name: 'series-1',
                data: hotelCountsData.map(num=>num.data)
              }]})

            
        }catch(err){
            console.log(err);
        }
      }
      fetchData();
    },[])
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height: "100vh"}}>
    {chartData && chartData?.series && (<Chart options={chartData.options} series={chartData.series} type="line" height={500} width={800} />)}
    </div>
    
  )
}

export default Data
