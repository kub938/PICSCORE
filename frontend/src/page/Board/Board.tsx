function Board() {
  const totalPages = 5;
  const photos = [
    {
      id: 1,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 2,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 3,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
    {
      id: 4,
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMjExMTZfNjQg/MDAxNjY4NjAxNTQ0NTkx.ROC56tm0ip8kmcaEaWVspU-NIRm17a6J4HTy6B9EO6Eg.B76PWwqHJZR1Pg0hfHOwQTYy46ihHNP0D1O38zhB-3Mg.JPEG.gngnt2002/%EF%BB%BF%EC%9A%B0%EB%8A%94_%EA%B3%A0%EC%96%91%EC%9D%B4_%EC%A7%A4_%EB%AA%A8%EC%9D%8C_(17).jpg?type=w800",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky border w-full h-15"></div>
      <div className="border overflow-y-auto flex-1 mb-16">
        {Array.from({ length: Math.ceil(photos.length / 3) }, (_, rowIndex) => (
          <div className="border flex w-full ">
            {photos
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((photo, index) => (
                <div key={index} className="max-w-1/3">
                  <img src={photo.imageUrl} alt="이미지 입니다." />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
