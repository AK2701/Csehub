import client from "../../../utils/sanityconnect";
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
import Image from "next/image";
import { ContentTable } from '../../../components';

function urlFor(source) {
    return builder.image(source)
}
/* Created with https://www.css-gradient.com */

const index = ({ subject }) => {
    // console.log(subject);
    return (
        <div className="w-screen bg-black min-h-screen py-10 px-4 sm:px-10 md:px-24">
            <div className="bg-white rounded-md w-full h-full">

                <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header class="px-5 py-4 border-b border-gray-100">
                        <h2 class="font-semibold text-2xl text-gray-800">{subject.name}</h2>
                    </header>

                    <div class="p-3">
                        <div class="overflow-x-auto">

                            {subject.cho &&
                                <ContentTable
                                    heading='CHO'
                                    data={subject.cho}
                                />
                            }

                            {subject.lecturefiles &&
                                <ContentTable
                                    heading='PDFs'
                                    data={subject.lecturefiles}
                                />
                            }

                            {subject.notes &&
                                <ContentTable
                                    heading='Notes'
                                    data={subject.notes}
                                />
                            }

                            {subject.answers &&
                                <ContentTable
                                    heading='Answers'
                                    data={subject.answers}
                                />
                            }

                            {subject.books &&
                                <ContentTable
                                    heading='Books'
                                    data={subject.books}
                                />
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export async function getStaticPaths(context) {
    const { params } = context;
    const years = await client.fetch(`*[_type == "year" ] | order(_createdAt asc)`);
    const subjects = await client.fetch('*[_type == "subject"] | order(_createdAt asc)')
    const paths = [];
    years.map((year) => {
        if (year.subjects && year.subjects.length > 0) {
            year.subjects.map((sub) => {
                subjects.forEach(subject => {
                    if (sub._ref === subject._id) {
                        paths.push({
                            params: {
                                year: year.slug.current,
                                subject: subject.slug.current
                            }
                        })
                    }
                });
            });
        }
    });

    return {
        paths,
        fallback: false
    }
}

const fetchData = async ({ data }) => {
    const ids = [];
    data.map(subject => {
        ids.push(subject._ref);
    });
    const query = ids.map(id => `_id == "${id}"`).join(' || ');
    const response = await client.fetch(`*[${query}] | order(name asc)`);
    return response;
}

const buildfileUrl = (data) => {
    const { asset } = data;
    const result = asset._ref;
    const a = result.split('-');
    return `https://cdn.sanity.io/files/${process.env.SANITY_PROJECTID}/${process.env.SANITY_DATASET}/${a[1]}.${a[2]}`;
}


export async function getStaticProps(context) {
    const { params } = context;
    let subject = await client.fetch(`*[_type == "subject" && slug.current == "${params.subject}"]`);
    subject = subject[0];
    if (subject.image) {
        subject.image = urlFor(subject.image).url();
    }
    if (subject.cho && subject.cho.length > 0) {
        subject.cho = await fetchData({ data: subject.cho });
        subject.cho.map(cho => {
            cho.cho = buildfileUrl(cho.cho);
            cho.url = cho.cho;
        });
    }
    if (subject.lecturefiles && subject.lecturefiles.length > 0) {
        subject.lecturefiles = await fetchData({ data: subject.lecturefiles });
        subject.lecturefiles.map(lecturefile => {
            lecturefile.lecturefile = buildfileUrl(lecturefile.lecturefile);
            lecturefile.url = lecturefile.lecturefile
        });
    }
    if (subject.notes && subject.notes.length > 0) {
        subject.notes = await fetchData({ data: subject.notes });
        subject.notes.map(note => {
            note.notes = buildfileUrl(note.notes);
            note.url = note.notes;
        });
    }
    if (subject.answers && subject.answers.length > 0) {
        subject.answers = await fetchData({ data: subject.answers });
        subject.answers.map(answer => {
            answer.answer = buildfileUrl(answer.answer);
            answer.url = answer.answer;
        });
    }
    if (subject.books && subject.books.length > 0) {
        subject.books = await fetchData({ data: subject.books });
        subject.books.map(book => {
            book.book = buildfileUrl(book.book);
            book.url = book.book;
        });
    }
    // console.log(subject);
    return {
        props: {
            subject,
        },
        revalidate: 10
    }
}


export default index;