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

    text-align: center;

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
        font-weight: 400;
        font-size: 1rem;
        line-height: 300%;
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
        font-size: 5rem;
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

        font-size: 5rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }

    @keyframes rotateInY {
    from {
        transform: rotateY(180deg);
        
    }
    to {
        transform: rotateY(0deg);
        
    }
}

    .front{
        
    }

    .elimination{
        position: fixed;
        
      
        width: 30rem;
        height: 7.4rem;
        padding: 0 2rem;

        letter-spacing: .5rem;
        font-size: 3rem;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
        animation: rotateInY 0.8s ease-out forwards;

        border-radius: 1rem;

        background-color: ${({ theme }) => theme.COLORS.RED};

        
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

export const RankingCompetitorsTable = styled.div`
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

        border-spacing: 0 .5rem;

      tbody {
         tr {
            th {
               font-weight: 400;
               font-size: 1.3rem;
               padding: .2rem;
               background-color: ${({ theme }) => theme.COLORS.LIGHT_300};
            }

            :nth-child(1){
               width: 2.5rem;
               height: 1.875rem;

               border-radius: .5rem;
               color: ${({ theme }) => theme.COLORS.LIGHT_100};
               background-color: ${({ theme }) => theme.COLORS.THEME_600};
               transform: skew(-10deg);
               position: absolute;

               
            }
            :nth-child(2){
                border-radius: 8px 0 0 8px;
                border-right:1px solid ${({ theme }) => theme.COLORS.LIGHT_400};
            }

            :nth-child(3){
                width: 8.125rem;
            }
         }
      }

      .bg_yellow {
        background-color: #ffd700;
    }

    .time {
        font-size: 1rem;
        padding: 5px 0;

        background-color: ${({ theme }) => theme.COLORS.THEME_700};
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
        
        position: relative;
        top: .5rem;
    }
   }
`;