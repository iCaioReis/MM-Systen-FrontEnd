import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root, body, input, button, textarea {
    font-size: 16px;

    @media(max-width: 1490px){
      font-size: 14px;
    }
    @media(max-width: 1220px){
      font-size: 12px;
    }
    @media(max-width: 1150px){
      font-size: 10px;
    }
  }

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.LIGHT_400};
    border-radius: 8px;

    background-clip: content-box;
    border: 5px solid transparent;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.LIGHT_300};
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.7);
  }

  .poppins_100_medium{
        font-family: 'poppins', serif;
        font-weight: 400;
        font-size: .875rem;
        line-height: 170%;
    }
    .poppins_200_medium{
        font-family: 'poppins', serif;
        font-weight: 400;
        font-size: 1.25rem;
        line-height: 160%;
    }
    .poppins_400_medium{
        font-family: 'poppins', serif;
        font-weight: 500;
        font-size: 2rem;
        line-height: 140%;
    }
    .poppins_500_medium{
        font-family: 'poppins', serif;
        font-weight: 400;
        font-size: 2.5rem;
        line-height: 140%;
    }
    .poppins_300_regular{
        font-family: 'poppins', serif;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 140%;
    }
    .poppins_300_bold{
        font-family: 'poppins', serif;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 140%;
    }
    .roboto_smallest_regular{
        font-family: 'Roboto', serif;
        font-weight: 400;
        font-size: .75rem;
        line-height: 160%;
    }
    .roboto_smaller_regular{
        font-family: 'Roboto', serif;
        font-weight: 400;
        font-size: .875rem;
        line-height: 160%;
    }
    .roboto_smaller_regular{
        font-family: 'Roboto', serif;
        font-weight: 400;
        font-size: .875rem;
        line-height: 160%;
    }
    .roboto_smaller_bold{
        font-family: 'Roboto', serif;
        font-weight: 700;
        font-size: .875rem;
        line-height: 160%;
    }
    .roboto_small_spaced{
        font-family: 'Roboto', serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 160%;
    }
    .roboto_small_regular{
        font-family: 'Roboto', serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 100%;
    }
    .roboto_big_bold{
        font-family: 'Roboto', serif;
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 160%;
    }
    .roboto_bigger_bold{
        font-family: 'Roboto', serif;
        font-weight: 700;
        font-size: 1.5rem;
    }
    .roboto_biggest_regular{
        font-family: 'Roboto', serif;
        font-weight: 700;
        font-size: 2rem;
        line-height: 160%;
    }
    .roboto_giant_bold{
        font-family: 'Roboto', serif;
        font-weight: 700;
        font-size: 2.625rem;
    }
`;