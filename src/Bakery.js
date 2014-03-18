var Bakery = function() {
    var ovenController = new Oven();
    var bakeView = new BakeryView('#oven td');

    $('#new_batch').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        bakeView.updatePrep(formData[0].value, formData[1].value);
    });

    $('#bake').on('click', function(e) {
        ovenController.bakeCookie();
        bakeView.updateOven(ovenController.getRacks());
    });

    $(document).on('click', '#prep_batches button', function(e) {
        $(this).parent().remove();
        ovenController.addCookie(new Cookie($(this).attr('name'), $(this).val()));
        bakeView.updateOven(ovenController.getRacks());
    });
}

var BakeryView = function(table) {
    var tableElements = [];
    $(table).each(function() {
        tableElements.push($(this).attr('id'))
    });

    this.updatePrep = function(type, value, max) {
        $('#prep_batches').append('<li >' + type + '<button name=' + type + ' value=' + value + '>Add Cookie</button></li > ');
    }

    this.updateOven = function(element) {
        $.each(tableElements, function(i, val) {
            var object = element[i]
            if (object) {
                if (object.time < 0) object.time = 0;
                var percent = object.time / object.max;
                var state;
                console.log(percent);
                switch (true) {
                    case percent > 0.9 && percent <= 1.0:
                        $('#' + val).addClass('raw');
                        console.log(object.type)
                        state = '[Raw]';
                        break;
                    case percent > 0.5 && percent <= 0.9:
                        $('#' + val).addClass('still_gooey');
                        state = '[Still Gooey]';
                        break;
                    case percent > 0.2 && percent <= 0.5:
                        $('#' + val).addClass('just_right');
                        state = '[Just Right]';
                        break
                    case percent <= 0.2:
                        $('#' + val).addClass('crispy');
                        state = '[Crispy]';
                }
                $('#' + val).html(object.type + " " + state);
            }
        });
    }
}

var Oven = function() {
    this.racks = [];
    this.getRacks = function() {
        return this.racks;
    }
    this.bakeCookie = function() {
        $.each(this.racks, function(i, val) {
            val.time -= 1;
            console.log(val.time);
        });
    }
    this.addCookie = function(cookie) {
        this.racks.push(cookie);
    }
    this.removeCookie = function(removeItem) {
        this.racks = $.grep(this.racks, function(value) {
            return value != removeItem;
        });
    }
}

var Cookie = function(type, time) {
    this.type = type;
    this.time = time;
    this.max = time;

    this.getType = function() {
        return this.type;
    }

    this.getTime = function() {
        return this.time;
    }
}
