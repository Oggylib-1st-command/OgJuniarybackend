# Generated by Django 4.2 on 2023-06-05 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_booking_remove_user_bookid_user_bookid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bookid',
            field=models.ManyToManyField(blank=True, default=None, max_length=30, null=True, related_name='bookid', to='app.booking', verbose_name='id_книги'),
        ),
    ]
