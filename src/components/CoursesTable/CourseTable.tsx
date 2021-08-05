import {Course} from '../../types/course';
import {Table, Typography, Space} from 'antd';
import DayTag from './DayTag';
import DownloadButton from './DownloadButton';
import {Breakpoint} from 'antd/lib/_util/responsiveObserve';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

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

    // Grab the breakpoint so that we can conditionalize the table.
    const breakpoint = useBreakpoint();

    // Create the column definitions.
    const columns = [
        {
            title: 'Registration Id',
            dataIndex: 'reg_id',
            key: 'reg_id',
            responsive: ['lg'] as Breakpoint[]
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            responsive: ['lg'] as Breakpoint[]
        },
        {
            title: 'Course',
            dataIndex: 'title',
            key: 'course',
            render: (text, record) => {
                const {title, instructors = [], times = [], reg_id} = record;
                if (!breakpoint.sm) {
                    return (
                        <div>
                            <Paragraph strong>{title}</Paragraph>
                            <Paragraph>Registration Id<br/>{reg_id}</Paragraph>
                            <Paragraph>Times{times.map((time, i) => (<div key={i}>{time.day} {time.start_time}-{time.end_time}</div>))}</Paragraph>
                            {instructors.length > 0 && <Paragraph>Instructors{instructors.map((instructor, i) => (<div key={i}>{renderName(instructor.name)}</div>))}</Paragraph>}
                        </div>
                    );
                } else if (!breakpoint.md) {
                    return (
                        <div>
                            <Paragraph strong>{title}</Paragraph>
                            <Paragraph>Registration Id<br/>{reg_id}</Paragraph>
                            {instructors.length > 0 && <Paragraph>Instructors{instructors.map((instructor, i) => (<div key={i}>{renderName(instructor.name)}</div>))}</Paragraph>}
                        </div>
                    );
                } else {
                    return title;
                }
            },
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
            responsive: ['md'] as Breakpoint[]
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
            },
            responsive: ['sm'] as Breakpoint[]
        },
        {
            title: 'Credits',
            dataIndex: 'credits',
            key: 'credits',
            responsive: ['lg'] as Breakpoint[]
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: renderSemester,
            responsive: ['lg'] as Breakpoint[]
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