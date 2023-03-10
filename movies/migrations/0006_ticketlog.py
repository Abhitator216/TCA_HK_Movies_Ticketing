# Generated by Django 4.1.4 on 2022-12-27 10:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0005_user_phone_no'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticketlog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat', models.JSONField()),
                ('cost', models.IntegerField()),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='movies.show')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
