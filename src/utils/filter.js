export const filterEventCompetitors = (data) => {
    const Competitors = []
    data.map((proof) => {
        proof.categories.map((categorie) => {
            categorie.competitors.map((competitor) => {
                Competitors.push(competitor)
            })
        })
    })

    const order = ["kids", "little", "juvenile", "beginner", "female", "adult", "master", "open"];

    const competitorsFilter = (Competitors.filter((item, index, self) =>
        index === self.findIndex((obj) => obj.competitor_iddd === item.competitor_iddd)
    )).sort((a, b) => {
        if (a.competitor_name.toLowerCase() < b.competitor_name.toLowerCase()) return -1;
        if (a.competitor_name.toLowerCase() > b.competitor_name.toLowerCase()) return 1;
        return 0;
    }).sort((a, b) => {
        return order.indexOf(a.competitor_category.toLowerCase()) - order.indexOf(b.competitor_category.toLowerCase());
    });

    return(competitorsFilter)
}