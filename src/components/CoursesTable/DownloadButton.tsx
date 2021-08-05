import {Button, Tooltip} from 'antd';
import {CalendarFilled} from '@ant-design/icons';
import {createICS} from '../../lib/ical';
import {Course} from '../../types/course';

function getBoundingDatesForSemester(course: Course) {
    const semester = course.semester;
    switch (semester) {
    case 'fall_2021':
        return ['08/30/2021', '12/18/2021'];
    case 'spring_2022':
        return ['01/18/2022', '04/29/2021'];
    default:
        throw new Error('Invalid semester provided.');
    }
}

function generateDownloadName(course: Course) {
    const {course_id, reg_id, semester} = course;
    return `${[course_id, reg_id, semester.replace('_', '')].join('_')}`;
}

export default function DownloadButton({course, ...rest}) {

    const handleClick = (course: Course) => {

        // Get the start and end dates for the semester.
        const [start, end] = getBoundingDatesForSemester(course);

        // Create the ics.
        const res = createICS(course, start, end);

        if (!res) {
            throw new Error('No response received from ical generator');
        }
        // Download the ics.
        if (res.value) {
            const name = generateDownloadName(course);
            const file = new Blob([res.value], {type: 'text/calendar'});
            const link = document.createElement('a');
            const url = URL.createObjectURL(file);
            link.href = url;
            link.setAttribute('download', name  + '.ics');
            link.click();
        } else if (res.error) {
            console.error(res.error);
        } else {
            console.error('There was a problem generating iCal file');
        }
    }

    return (
        <Tooltip title="Download iCal for this course" placement="left">
            <Button 
                type="primary" 
                shape="circle" 
                icon={<CalendarFilled />} 
                {...rest} 
                onClick={() => handleClick(course)}
            />
        </Tooltip>
    );
}