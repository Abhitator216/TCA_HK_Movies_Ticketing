# Generated by Django 4.1.4 on 2023-01-06 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0011_remove_show_rate_show_alpha_range_show_rate1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='show',
            name='rate1',
        ),
        migrations.AddField(
            model_name='show',
            name='rate',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
