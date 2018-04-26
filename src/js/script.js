$(document).ready(function() {
    alert("sdfsdfsdfsdf");
    $(".total").circularProgress({
        line_width: 6,
        color: "#fff",
        starting_position: 25, // 12.00 o' clock position, 25 stands for 3.00 o'clock (clock-wise)
        percent: 0, // percent starts from
        percentage: true,
        text: "More power behind every pixel"
    }).circularProgress('animate', 100, 5000);
});
