const example = [
  {
    comment: 'Name of the workflow',
    content: 'name: Hello world',
  },
  {
    comment:
      'Trigger the workflow on push or pull request\nAnother line of comment\nAnother line of comment222\nAnother line of comment2233234',
    content: 'on:\n  push:\n    branches:\n      - main',
  },
  {
    comment:
      'A workflow run is made up of one or more jobs that can run sequentially or in parallel',
    content: 'jobs:\n  hello-world:',
  },
  {
    comment: 'The type of runner that the job will run on',
    content:
      '    runs-on: ubuntu-latest\n    steps:\n      - name: Hello world\n        run: echo "Hello world"\n      - name: Test',
  },
  {
    comment: 'We can use multiple lines',
    content: '        run: |\n          ls -all\n          echo "Hello world"',
  },
];

export function Home() {
  return (
    <div>
      <table className="w-full">
        <tbody>
          {example.map((item, key) => (
            <tr className="hover:bg-slate-300 table-row-group" key={key}>
              <td className="w-1/2 whitespace-pre-line">{item.comment}</td>
              <td className="group-hover:bg-slate-300 p-2 whitespace-pre-line">
                <pre>{item.content}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
