const index = ({ heading, data }) => {
    console.log(heading, data);
    if (data && data.length > 0) {
        return (
            <table className="table-auto md:table-fixed mt-10 w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-200">
                    <tr>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{heading}</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">View</div>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {data.map((item, index) => {
                        console.log(item);
                        return (
                            <tr key={index}>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="font-medium text-gray-800">{item.name}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">
                                        <a href={item.url} target='_blank' className="bg-blue-500 px-4 text-sm text-white py-1 rounded-md">
                                            View
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
    else {
        return (
            <></>
        );
    }
}

export default index;