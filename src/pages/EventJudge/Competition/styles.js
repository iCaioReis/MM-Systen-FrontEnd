import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    
    display: flex;
    align-items: center;
    justify-content: center;

    >.zone {
        width: 100%;
        height: 50vh;

        position: absolute;
        bottom: 0;
        z-index: -1;

        background-color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }
`;

export const Content = styled.div`
    max-width: 1440px;
    height: 600px;

    display: grid;
    grid-template-columns: 15rem 35rem 15rem;
    grid-template-rows: auto;
    
    gap: 10rem;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5rem;
        
    > div {
        display: flex;
        flex-direction: column;
        gap: .5rem;

        img {
            width: 15rem;
            height: 15rem;

            border-radius: 8px;

            object-fit: cover;
        }
    }
`;

export const Picture = styled.div`
    position: relative;

    label {
    height: 3.5rem;
    width: 15rem;
    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    border-radius: 0 0 8px 8px;

    background-color: ${({ theme }) => theme.COLORS.THEME_700};
    input {
        display: none;
    }
}
`;

export const Main = styled.div`
    color: ${({ theme }) => theme.COLORS.THEME_900};
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.div`
    > h1 {
        font-family: 'poppins', serif;
        font-weight: 500;
        font-size: 2.5rem;
        line-height: 140%;
    }

    > span {
        font-family: 'poppins', serif;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 140%;
    }
`;

export const Timer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -5rem; /* Negative half of height. */
    margin-left: -15rem;
    
    input {
        width: 30rem;
        height: 7.4rem;
        padding: 0 2rem;

        letter-spacing: .5rem;
        font-size: 80px;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};

        border-radius: 1rem;
        border-style: none;

        background-color: ${({ theme }) => theme.COLORS.THEME_700};
    }
    .addition{
        position: absolute;
        top: -3.2rem;
        left: 2rem;

        z-index: -1;
        input {
            width: 10rem;
            height: 4rem;
            padding: 0;

            text-align: center;

            font-size: 2rem;
            letter-spacing: 0;

            border-radius: 1rem 1rem 0 0;

            background-color: ${({ theme }) => theme.COLORS.RED};
        }
    }
    .s {
        position: absolute;
        right: 3rem;
        bottom: .7rem;

        font-size: 80px;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }
`;

export const JudgeArea = styled.div`
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    width: 30rem;

    margin: 0 auto 6rem;

    display: flex;
    flex-direction: column;
    gap: .5rem;

    text-align: left;

    > .header{
        display: flex;
        flex-direction: column;
        gap: .5rem;

        > .timeAndFoul{
            height: 4rem;

            padding: 0 2rem ;
            
            align-items: center;
            justify-content: space-between;
            
            border-radius: 1rem;

            background-color: ${({ theme }) => theme.COLORS.THEME_600};

            span {
                color: ${({ theme }) => theme.COLORS.LIGHT_100};
            }

            .inputTimer {
                input {
                    letter-spacing: .07rem;
                    font-size: 1.5rem;
                }   
                max-width:  8rem;
            }
        }

        .flex {
            display: flex;
            gap: .5rem;
        }
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    >.buttons{
        margin-bottom: 1rem;

        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
`;

export const InputFouls = styled.div`
    display: flex;

    > button {
        width: 2rem;
        font-size: 2rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
        
        background-color: ${({ theme }) => theme.COLORS.THEME_900};

        border-style: none;
    }

    >input {
        width: 3rem;

        font-size: 1.5rem;
        text-align: center;

        border-style: none;
    }

    >.add {
        border-radius: 0 4px 4px 0;
    }
    >.decrement {
        border-radius: 4px 0 0 4px;
    }
`;

export const EliminatoryFouls = styled.div`
  display: flex;
  gap: 10px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const StyledLabel = styled.label`
    text-align: center;
    width: 100%;
    padding: 10px 20px;

    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.RED};
    
    border-radius: 5px;
    border: 2px dashed  ${({ theme }) => theme.COLORS.RED};

    background-color: transparent;
    transition: filter 0.2s;

    cursor: pointer; /* Cursor de ponteiro para indicar que é clicável */
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}; 
    user-select: none; /* Previne a seleção do texto ao clicar */

  ${HiddenCheckbox}:checked + & {
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.RED};
    
  }
        
    &:hover {
        filter: none;
        
        color: ${props => (props.disabled ? ({ theme }) => theme.COLORS.RED : ({ theme }) => theme.COLORS.LIGHT_100)};
        
        background-color: ${props => (props.disabled ? ({ theme }) => theme.COLORS.LIGHT_100 : ({ theme }) => theme.COLORS.RED)};

        
    }
    &:disabled{
        filter: none;
        color: ${({ theme }) => theme.COLORS.RED};
        background-color: none;
    }

`;

export const UpcomingCompetitorsTable = styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   gap: 1rem;

   color: ${({ theme }) => theme.COLORS.THEME_600};

   > h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.THEME_700};
   }

   > table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 .2rem;

      tbody {
         tr {
            th {
               font-weight: 400;
               font-size: .9rem;
               padding: .2rem;
               border: 1px dashed ${({ theme }) => theme.COLORS.THEME_600};
               border-radius: 8px;
            }

            :nth-child(1){
                border-radius: 8px 0 0 8px;
            }
            :nth-child(2){
                border-radius: 0 8px 8px 0;
            }
         }
      }
   }
`;