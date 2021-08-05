import {Tag} from 'antd';

export default function DayTag({day, ...rest}) {
    const getColorFromDay = (day) => {
        switch (day) {
        case 'SU':
            return 'magenta';
        case 'M':
            return 'volcano';
        case 'T':
            return 'orange';
        case 'W':
            return 'green';
        case 'TH':
            return 'cyan';
        case 'F':
            return 'gold';
        case 'SA':
            return 'geekblue';
        default:
            return 'red';
        }
    };

    return (
        <Tag 
            color={getColorFromDay(day)} 
            {...rest} 
            style={{width: '1.8rem', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}
        >{day}</Tag>
    );

}