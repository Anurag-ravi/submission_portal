const Assignment = require('../models/assignment');
const sendEmail = require('../config/email');

const notifyTA = async (assId) => {
    const assignment = await Assignment.findById(assId)
    .populate({
        path : 'course',
        select : 'faculties name code',
        populate : {
            path : 'faculties',
            select : 'email'
        }
    });
    const { course } = assignment;
    const { faculties } = course;
    const { name, code } = course;

    let emails = [];
    faculties.forEach(faculty => {
        emails.push(faculty.email);
    });

    const subject = `${code} - ${assignment.name} - Due Date Reached`;
    const html = `
                <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
                <h1 style="color: #333333;">Dear Tutor,</h1>
                <p style="color: #666666; font-size: 18px;">The deadline for ${assignment.name} for course - ${code}(${name}) has been over.We would like to remind you to evaluate the submissions.</p>
                <p style="color: #666666; font-size: 18px;">Thank you</p>
                <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 10px; padding: 20px;">
                    <p style="color: #666666; font-size: 18px;">Regards,</p>
                    <p style="color: #666666; font-size: 18px;">Submission Portal</p>
                </div>
            </div>`;
    Promise.all(emails.map((email) => sendEmail(email, subject, html)));
}

const getHTML = (assignment,name,code,student) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
                <h1 style="color: #333333;">Dear ${student.name},</h1>
                <p style="color: #666666; font-size: 18px;">A new Assignment - ${assignment.name} for course - ${code}(${name}) has been created.Please submit it before the deadline.</p>
                <p style="color: #666666; font-size: 18px;">Thank you</p>
                <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 10px; padding: 20px;">
                    <p style="color: #666666; font-size: 18px;">Regards,</p>
                    <p style="color: #666666; font-size: 18px;">Submission Portal</p>
                </div>
            </div>
    `;
}
const getHTML2 = (assignment,name,code,student) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
                <h1 style="color: #333333;">Dear ${student.name},</h1>
                <p style="color: #666666; font-size: 18px;">Assignment - ${assignment.name} for course - ${code}(${name}) is Due in 24 hours.Please submit it before the deadline.</p>
                <p style="color: #666666; font-size: 18px;">Thank you</p>
                <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 10px; padding: 20px;">
                    <p style="color: #666666; font-size: 18px;">Regards,</p>
                    <p style="color: #666666; font-size: 18px;">Submission Portal</p>
                </div>
            </div>
    `;
}

const notifyStudent = async (assId) => {
    const assignment = await Assignment.findById(assId)
    .populate({
        path : 'course',
        select : 'students name code',
        populate : {
            path : 'students',
            select : 'email name'
        }
    });
    const { course } = assignment;
    const { students } = course;
    const { name, code } = course;

    const subject = `New Assignment - ${code} - ${assignment.name}`;
    
    Promise.all(students.map((student) => sendEmail(student.email, subject, getHTML(assignment,name,code,student))));
}

const remindStudent = async (assId) => {
    const assignment = await Assignment.findById(assId)
    .populate({
        path : 'course',
        select : 'students name code',
        populate : {
            path : 'students',
            select : 'email name'
        }
    });
    const { course } = assignment;
    const { students } = course;
    const { name, code } = course;

    const subject = `Assignment Due in 24 hours - ${code} - ${assignment.name}`;
    
    Promise.all(students.map((student) => sendEmail(student.email, subject, getHTML2(assignment,name,code,student))));
}

module.exports = { notifyTA, notifyStudent, remindStudent };