import * as React from 'react';

interface ThumbProps {
  file: File;
}

export default class Thumb extends React.Component<ThumbProps> {
  // const [loading, setLoading] = React.useState(false);
  // const [thumb, setThumb] = React.useState(undefined);
  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.file) { return; }
  //   this.setState({ loading: true }, () => {
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.setState({ loading: false, thumb: reader.result });
  //     };
  //     reader.readAsDataURL(nextProps.file);
  //   });
  // }
  // render() {
  //   const { file } = this.props;
  //   const { loading, thumb } = this.state;
  //   if (!file) { return null; }
  //   if (loading) { return <p>loading...</p>; }
  //   return (<img src={thumb}
  //     alt={file.name}
  //     className="img-thumbnail mt-2"
  //     height={200}
  //     width={200} />);
  // }
}
