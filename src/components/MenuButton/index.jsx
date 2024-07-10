import { Container } from './styles';

export function MenuButton({icon: Icon, title, ...rest }){
    return(
        <Container {...rest} >
            {Icon}

            <div className='title'>
                <span className='poppins_200_medium'>
                    {title}
                </span>
            </div>
        </Container>
    )
}