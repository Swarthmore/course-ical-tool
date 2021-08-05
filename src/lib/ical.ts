import {RRule} from 'rrule';
import {createEvents, EventAttributes} from 'ics';
import {Course} from '../types/course';
import moment from 'moment-timezone';

// See: https://momentjs.com/docs/#/use-it/node-js/
moment().tz('America/New_York').format();

// See: https://github.com/moment/moment/issues/3488
moment.suppressDeprecationWarnings = true;

/**
 * Returns the duration between $t1 and $t2
 * @param t1
 * @param t2
 */
function duration(t1: string, t2: string): { minutes: number; hours: number } {
    const m1 = moment(t1, 'HH:mm a');
    const m2 = moment(t2, 'HH:mm a');
    const duration = moment.duration(m2.diff(m1));
    return {
        minutes: duration.get('minutes'),
        hours: duration.get('hours')
    };
}

/**
 * Returns the moment numerical representation of $day
 * @note Sunday and Saturdays don't show up in the source JSON
 */
export function convertDayToMomentNumber(day: string) {
    if (day === 'M') return 1;
    if (day === 'T') return 2;
    if (day === 'W') return 3;
    if (day === 'TH') return 4;
    if (day === 'F') return 5;
    // keep these last since they are very unlikely to match true
    if (day === 'S') return 6;
    if (day === 'U') return 0;
    // throw an error if the given day is invalid
    throw new Error('Provided day is invalid');
}

/**
 * Returns the Rrule enum representation of $day
 * @note Sunday and Saturdays don't show up in the source JSON
 */
export function convertDayToEnum(day: string) {
    if (day === 'M') return RRule.MO;
    if (day === 'T') return RRule.TU;
    if (day === 'W') return RRule.WE;
    if (day === 'TH') return RRule.TH;
    if (day === 'F') return RRule.FR;
    // keep these last since they are very unlikely to match true
    if (day === 'S') return RRule.SA;
    if (day === 'U') return RRule.SU;
    // throw an error if the given day is invalid
    throw new Error('Provided day is invalid');
}

/**
 * Returns a DateArray representation of $time
 * @param time
 * @returns [number, number, number, number, number]
 */
function formatStartTime(time: moment.Moment) {
    const formatted = time.format('YYYY-M-D-H-m');
    return formatted.split('-').map(a => +a)
}

/**
 * Returns the a moment object set to the first day $day that occurs after $fromDate.
 * @param fromDate
 * @param day
 * @param startTime
 */
export function firstDayAfterDate(fromDate: string, day: string, startTime: string): moment.Moment {
    try {
        let first = moment(`${fromDate} ${startTime}`, 'MM-DD-YYYY hh:mm a');
        do first = first.add(1, 'days');
        while (first.day() !== convertDayToMomentNumber(day));
        return first;
    } catch (e) {
        throw e
    }
}

/**
 * @param course - The course to create the ical file from
 * @param fromDate - Events start from this date. Format in MM/DD/YYYY
 * @param untilDate - Events end at this date. Format in MM/DD/YYYY
 */
export function createICS(
    {title, department, section, times, instructors, ...rest}: Course,
    fromDate: string,
    untilDate: string
) {

    if (!times) return;

    // placeholder for event configs
    const eventConfigs: EventAttributes[] = [];

    //const from = moment(fromDate);
    const until = moment(untilDate);

    function createRrule(day: string, until: moment.Moment) {
        return new RRule({
            freq: RRule.WEEKLY,
            byweekday: convertDayToEnum(day),
            until: until.toDate()
        }).toString().split('RRULE:')[1];
    }

    // for each times in course.times[], we will need to create
    // an ics event
    for (const {day, start_time, end_time} of times) {

        const start = firstDayAfterDate(fromDate, day, start_time);

        // create the ics event
        const config: EventAttributes = {
            // @ts-ignore
            start: formatStartTime(start),
            duration: duration(start_time, end_time),
            recurrenceRule: createRrule(day, until),
            status: 'CONFIRMED',
            title: [department, title, section].join(' '),
            description: title,
            // get the first instructor from the course
            ...(instructors && {
                organizer: {
                    name: instructors[0].name,
                    email: instructors[0].email
                }
            })
        };
        eventConfigs.push(config);

    }

    return createEvents(eventConfigs);
}