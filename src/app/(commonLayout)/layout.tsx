import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const CommonLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;