import { useRouter } from 'next/router'
import client from '../../utils/sanityconnect';
import imageUrlBuilder from '@sanity/image-url'
import { SubjectCard } from '../../components';

const builder = imageUrlBuilder(client)

function urlFor(source) {
    return builder.image(source)
}

const index = ({ subjects }) => {
    // console.log(subjects);
    return (
        <>
            <div className='bg-black w-screen py-10 px-4 h-screen overflow-y-scroll '>
                <div className='grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 '>
                    {subjects ?
                        subjects.map((subject, index) => {
                            return (
                                <SubjectCard
                                    key={index}
                                    title={subject.name}
                                    slug={subject.slug.current}
                                    url={subject.image}
                                />
                            )
                        })
                        :
                        <div>Releasing...</div>
                    }
                </div>
                <div className='w-full cursor-pointer bg-green-600 px-4 py-1 text-center text-white rounded-md'>
                    App Releasing Tommorow
                </div>
            </div>
        </>
    );
}


export async function getStaticPaths() {
    const years = await client.fetch('*[_type == "year"] | order(_createdAt asc)');
    const paths = years.map(year => {
        return {
            params: {
                year: year.slug.current
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const years = await client.fetch('*[_type == "year"] | order(_createdAt asc)');
    let data = null;
    years.map(year => {
        if (year.slug.current === params.year) {
            data = year.subjects;
        }
    });

    const ids = [];
    if (data && data.length > 0) {
        data.map(subject => {
            ids.push(subject._ref);
        });
    }
    if (ids.length > 0) {
        const query = ids.map(id => `_id == "${id}"`).join(' || ');
        const subjects = await client.fetch(`*[${query}] | order(_updatedAt asc)`);
        // console.log(subjects);
        if (subjects.length > 0) {
            subjects.map(subject => {
                subject.image = urlFor(subject.image).url();
            });
        }

        return {
            props: {
                subjects
            },
            revalidate: 10
        }
    } else {
        return {
            props: {
                subjects: []
            },
            revalidate: 10
        }
    }
}

export default index;