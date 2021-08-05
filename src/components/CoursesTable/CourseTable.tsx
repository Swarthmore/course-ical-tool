import {Course} from '../../types/course';
import {Table, Typography, Space} from 'antd';
import DayTag from './DayTag';
import DownloadButton from './DownloadButton';

const {Paragraph} = Typography;

export default function CourseTable({courses, ...rest}) {

    // antd requires each course to have a key.
    const coursesWithKeys = courses.map((course, i) => ({key: i.toString(), ...course})) as Course[];
  
    // Shuffle around the instructor's name.
    const renderName = name => {
        const split =  name.split(',');
        return split[1].trim() + ' ' + split[0].trim();
    }

    // Return a prettified semester name.
    const renderSemester = semester => {
        switch(semester) {
        case 'fall_2021':
            return 'Fall 2021';
        default:
            return semester;
        }
    }

    // Create the column definitions.
    const columns = [
        {
            title: 'Registration Id',
            dataIndex: 'reg_id',
            key: 'reg_id'
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Instructors',
            dataIndex: 'instructors',
            key: 'instructors',
            render: instructors => {
                if (instructors) {
                    return (
                        <Space direction="vertical" align="center">
                            {instructors.map((instructor, i) => (
                                <div key={i}>
                                    <Paragraph>{renderName(instructor.name)}</Paragraph>
                                    <Paragraph>{instructor.email}</Paragraph>
                                </div>
                            ))}
                        </Space>
                    );
                } else {
                    return '';
                }
            },
        },
        {
            title: 'Times',
            dataIndex: 'times',
            key: 'times',
            render: times => {
                if (times) {
                    return (
                        <Space direction="vertical" align="center">
                            {times.map((time, i) => (
                                <div key={i}>
                                    <Paragraph style={{display: 'flex', alignItems: 'center'}}><DayTag day={time.day} />{time.start_time} - {time.end_time}</Paragraph>
                                </div>
                            ))}
                        </Space>
                    );
                } else {
                    return '';
                }
            }
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: renderSemester
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <DownloadButton course={record} />
                );
            }
        }
    ];

    return (
        <div className="CourseTable">
            <Table dataSource={coursesWithKeys} columns={columns} {...rest} />
        </div>
    );
}